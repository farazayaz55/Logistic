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
    const filteredFlights = flights.filter(
      (flight: { arrival: { iataCode: string } }) =>
        flight.arrival.iataCode === destinationCode
    );
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
    return details
  }
  catch(error){
    console.log(error)
  }
}


export const airSolutions = createTRPCRouter({
  getAllPossibleAirFreights: publicProcedure
    .input(inputParamSchema)
    .mutation(async ({ input }) => {
      return await noTransitionFind(input);

      //  return await singleTransitionFind(input)
    }),

  getTrackingDetails:publicProcedure.input(inputParamSchema2).mutation(async({input})=>{
    return await Tracking(input)
  })
});
