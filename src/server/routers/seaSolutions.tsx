import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
var shippo = require("shippo")(
  "shippo_live_aae3a275ae46047466f0d9e39a7cb4018cc15afc"
);

export const seaSolutionsRouter = createTRPCRouter({
  getAllPossibleFreights: publicProcedure
    .input(
      z.object({
        source: z.object({
          city: z.string(),
          zip: z.string(),
          country: z.string(),
        }).required(),
        destination: z.object({
          city: z.string(),
          zip: z.string(),
          country: z.string(),
        }).required(),
      })
    )
    .mutation(async ({ input }) => {
      const shipmentParams = {
        address_from: {
          name: "John Smith",
          city: input.source.city,
          zip: input.source.zip,
          country: input.source.country,
        },
        address_to: {
          name: "Jane Doe",
          city: input.destination.city,
          zip: input.destination.zip,
          country: input.destination.country,
        },
        parcels: [
          {
            length: "10",
            width: "10",
            height: "10",
            weight: "1",
            mass_unit: "lb",
            distance_unit: "in",
          },
        ],
      };
      
      try {
        const shipment:any = await new Promise((resolve, reject) => {
          shippo.shipment.create(shipmentParams, (err: any, shipment: any) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(shipment);
            }
          });
        });
  

        const carriers = await new Promise((resolve, reject) => {
          shippo.carrieraccount.list((err: any, carrierAccounts: { results: any[]; }) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              const carriers = carrierAccounts.results.map((account: { carrier: any; }) => account);
              resolve(carriers);
            }
          });
        });
        

        const rates:any = await new Promise((resolve, reject) => {
          shippo.shipment.rates(
            shipment.object_id,
            {carriers:'deutsche_post'},
            (err: any, rates: any) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve(rates);
              }
            }
          );
        });
        console.log(rates.results)
        return rates.results
      } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve rates.");
      }
    }),
});
