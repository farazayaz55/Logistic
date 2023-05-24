import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import request from "request";
import axios from "axios";

export const airSolutions = createTRPCRouter({
  getAllPossibleAirFreights: publicProcedure
    .input(
      z.object({
        accountNumber: z.string(),
        carrierCodes: z.string(),
        originAirportCode: z.string(),
        destinationAirportCode: z.string(),
        departureOn: z.string(),
        weight: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const apiKey = "d86272-fffc76";
        const url = `https://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${input.originAirportCode} & type=departure`;
        const url2 = `https://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${input.destinationAirportCode} & type=arrival`;
        const response = await axios.get(url);
        const flights = response.data;
        const filteredFlights = flights.filter(
          (flight: { arrival: { iataCode: string } }) =>
            flight.arrival.iataCode === input.destinationAirportCode
        );
        console.log(filteredFlights);
        if (filteredFlights.length == 0) {
          //find connecting flights

          const response2 = await axios.get(url2);
          const flights2 = response2.data;
          console.log(flights2);

          //iterate each index , take departure and find that in arrival of response1
          flights2.map((flight2: { departure: { iataCode: any } }) => {
            const iataOfSrc = flight2.departure.iataCode;
            flights.map((flight: { arrival: { iataCode: any } }) => {
              if (flight.arrival.iataCode == iataOfSrc) {
                console.log(
                  input.originAirportCode,
                  iataOfSrc,
                  input.destinationAirportCode
                );
              }
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }),
});
