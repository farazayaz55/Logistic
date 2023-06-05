import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import request from "request";
import axios from "axios";
import dayjs from "dayjs";

const inputParamSchema = z.object({
  accountNumber: z.string(),
  carrierCodes: z.string(),
  originAirportCode: z.string(),
  destinationAirportCode: z.string(),
  departureOn: z.string(),
  weight: z.string(),
});


const inputParamSchema2=z.object({
  trackingNumber:z.string()
})


const apiKey:string = "d86272-fffc76";


const noTransitionFind = async (input: z.infer<typeof inputParamSchema>) => {
  const limitResult: number = 5;

  try {
    const today = dayjs();
    const sevenDaysLater = today.add(7, "days");
    const targetDate =
      input.departureOn == "" ? today : dayjs(input.departureOn);
    var destinationCode = "";
    var url;
    if (targetDate.isAfter(sevenDaysLater, "day")) {
      console.log("using future");
      const fomrattedDate = targetDate.format("YYYY-MM-DD");
      url = `https://aviation-edge.com/v2/public/flightsFuture?key=${apiKey}&iataCode=${input.originAirportCode}&type=departure&date=${fomrattedDate}`;
      destinationCode = input.destinationAirportCode.toLowerCase();
    } else {
      console.log("using timetable");
      url = `https://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${input.originAirportCode}&type=departure`;
      destinationCode = input.destinationAirportCode;
    }
    const response = await axios.get(url);
    const flights = response.data;
    //we got all the flights departing from our source then we filter to only those which are going to our desired destination
    const filteredFlights = flights.filter(
      (flight: { arrival: { iataCode: string } }) =>
        flight.arrival.iataCode === destinationCode
    );

    console.log(filteredFlights)

    //then filter only those who support cargo

    const cargoFlights=filteredFlights.filter(async(flight: { airline: { iataCode: string; icaoCode: string; }; })=>{
      const url=`https://aviation-edge.com/v2/public/airlineDatabase?key=${apiKey}&codeIataAirline=${flight.airline.iataCode}`
      const respo=await axios.get(url)
      const dataOfRespo=respo.data
      dataOfRespo.map((airline: { icaoCode: string; type: string })=>{
        if(airline.icaoCode==flight.airline.icaoCode){
          //this is the airline
          if(airline.type.includes("cargo")){
            return airline
          }
        }
      })
    })

    return cargoFlights

    return filteredFlights;
  } catch (error) {
    console.log(error);
  }
};


const Tracking=async(input:z.infer<typeof inputParamSchema2>)=>{
  try{
    const url=`https://aviation-edge.com/v2/public/flights?key=${apiKey}&flightIata=${input.trackingNumber}`
    const response = await axios.get(url);
    const details = response.data;
    console.log(details)
    if(!details.error)
    return details
    else{
      return {
        msg:"No record Found"
      }
    }
  }
  catch(error){
    console.log(error)
  }
}


export const airSolutions = createTRPCRouter({
  getAllPossibleAirFreights: publicProcedure.meta({openapi:{method:'GET',path:'/getAllPossibleAirFreights'}})
    .input(inputParamSchema)
    .mutation(async ({ input }) => {
      return await noTransitionFind(input);

      //  return await singleTransitionFind(input)
    }),

  getTrackingDetails:publicProcedure.meta({openapi:{method:'GET',path:'/getAirTracking'}}).input(inputParamSchema2).mutation(async({input})=>{
    //first

    const airlineIata=input.trackingNumber.slice(0,2)
    const flightNumber=input.trackingNumber.slice(-3)
    return await Tracking(input)
  })
});
