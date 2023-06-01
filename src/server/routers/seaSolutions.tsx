import axios from "axios";
import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
var shippo = require("shippo")(
  "shippo_live_aae3a275ae46047466f0d9e39a7cb4018cc15afc"
);

const EasyPostClient = require("@easypost/api");

const client = new EasyPostClient(
  "EZTK31b4cb8c3b1c45e5b5d2338fb178dbcaZ9AZeC0r4EYLrgam9LreQw"
);

export const seaSolutionsRouter = createTRPCRouter({
  getAllPossibleFreights: publicProcedure.meta({openapi:{method:'GET',path:'/getAllPossibleSeaFreights'}})
    .input(
      z.object({
            sourceCity: z.string(),
            sourceZip: z.string(),
            sourceState: z.string(),
            sourceStreet: z.string(),
            sourceCountry: z.string(),

            destCity: z.string(),
            destZip: z.string(),
            destCountry: z.string(),
            destState: z.string(),
            destStreet: z.string(),
          length:z.string(),
          weight:z.string(),
          width:z.string(),
          height:z.string() 
        })
    )
    .mutation(async ({ input }) => {
      const shipmentParams = {
        address_from: {
          city: input.sourceCity,
          zip: input.sourceZip,
          country: input.sourceCountry,
          state: input.sourceState,
        },
        address_to: {
          city: input.destCity,
          zip: input.destZip,
          country: input.destCountry,
          state: input.destState,
        },
        parcels: [
          {
            length: input.length,
            width: input.width,
            height: input.height,
            weight: input.weight,
            mass_unit: "lb",
            distance_unit: "in",
          },
        ],
      };

      try {
        const shipment: any = await new Promise((resolve, reject) => {
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
          shippo.carrieraccount.list(
            (err: any, carrierAccounts: { results: any[] }) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                const carriers = carrierAccounts.results.map(
                  (account: { carrier: any }) => account
                );
                resolve(carriers);
              }
            }
          );
        });

        const rates: any = await new Promise((resolve, reject) => {
          shippo.shipment.rates(
            shipment.object_id,
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
        console.log(rates.results);

        const customsInfo = await client.CustomsInfo.create({
          eel_pfc: 'NOEEI 30.37(a)',
          customs_certify: true,
          customs_signer: 'Steve Brule',
          contents_type: 'merchandise',
          contents_explanation: '',
          restriction_type: 'none',
          restriction_comments: '',
      
        });

        let shipmentRes;


        

        shipmentRes = await client.Shipment.create({
          to_address: {
            // street1: input.destination.street,
            city: input.destCity,
            state: input.destState,
            zip: input.destZip,
            country: input.destCountry,
          },
          from_address: {
            // street1: input.source.street,
            city: input.sourceCity,
            state: input.sourceState,
            zip: input.sourceZip,
            country: input.sourceCountry,
          },
          parcel: {
            length: 20.2,
            width: 10.9,
            height: 5,
            weight: 65.9,
          },
          customs_info: { id: customsInfo.id }
        });

        console.log(shipmentRes.rates);

        return [...rates.results, ...shipmentRes.rates];
      } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve rates.");
      }
    }),

  tracking: publicProcedure.meta({openapi:{method:'GET',path:'/seaTracking'}})
    .input(
      z.object({
        trackingNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios({
          method: "get",
          url: `https://api.goshippo.com/tracks/${input.trackingNumber}`,
          headers: {
            Authorization: `ShippoToken shippo_live_aae3a275ae46047466f0d9e39a7cb4018cc15afc`,
          },
        });

        console.log(response);
        const trackingInfo = response.data;
        console.log("Tracking info:", trackingInfo);
        return trackingInfo;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve tracking information.");
      }
    }),
});
