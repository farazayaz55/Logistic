/* eslint-disable no-unused-vars */
import React, { useEffect, useState,KeyboardEvent,RefObject } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Grid, TextField, Autocomplete, Chip, Typography } from "@mui/material";
import { google } from "google-maps";
import axios from "axios";

interface AutoCompleteProps {
  city: string; // Assuming an array of strings representing city names
  setCity: React.Dispatch<React.SetStateAction<string>>; // Assuming the state action dispatch function for updating cities
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;

}

const MapsAutocomplete: React.FC<AutoCompleteProps> = ({
  city,
  setCity,
  country,
  setCountry,
  zipCode,
  setZipCode,
  setMsg
}) => {

  const triggerHiddenEffect=()=>{
    setTimeout(()=>setMsg(""),3000)
  }
  
  const [textValue, setTextValue] = useState<string | undefined | null >(null);

  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyDXFJBn33N8ttSU29znw126DGWClXV-vkE",
    onPlaceSelected: async (place: google.maps.places.PlaceResult) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${place.geometry?.location.lat()},${place.geometry?.location.lng()}&key=AIzaSyDXFJBn33N8ttSU29znw126DGWClXV-vkE`
      );

      const data = await response.json();

      const city = data.results[0]?.address_components?.find(
        (component: any) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1")
      )?.long_name;

      const zipcode = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: city.toLowerCase(),
            key: "0c6ecacdfaeb42ae92e351cbaba76549",
          },
        }
      );

      for (let i = 0; i < zipcode.data.results.length; i++) {
        const firstResult = zipcode.data.results[i];

        let zipCode;
        if (firstResult.components.postcode) {
          zipCode = firstResult.components.postcode;

          console.log(`zipcode is ${zipCode} for city ${city}`);

          setCity(city);
          setZipCode(zipCode);
          if(place && place.address_components && place.formatted_address){
          for(let i=0;i<place.address_components.length;i++){
            if(place.address_components[i].short_name)
            {
              setCountry(place.address_components[i].short_name);
            }
          }
          setTextValue(place.formatted_address);
        }

          setMsg("Field set")
          triggerHiddenEffect()
          if(inputRef && inputRef.current && inputRef.current.value)
          inputRef.current.value = "";
          break;
        } else {
          continue;
        }
      }
    },
  });



  const inputRef: RefObject<HTMLInputElement|null> = ref;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Backspace") {
      console.log("backspace pressed");
      if (textValue !== null) {
        console.log("making it null");
        setTextValue(null);
      }
    }
  };

  return (
    <>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <div style={{ width: "100%", marginTop: "20px"}}>
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            inputRef={inputRef}
            sx={{
              width: "100%",

              "& .MuiOutlinedInput-root": {
                borderRadius: "400px",
                boxShadow: "0px 4px 14px 0px #C9CFCD",
              },
              "& .MuiOutlinedInput-input": {
                borderTopLeftRadius: "0px !important",
                borderBottomLeftRadius: "0px !important",
              },
            }}
            value={textValue}
            onKeyDown={handleKeyDown}
          />
        </div>
      </Grid>
    </>
  );
};

export default MapsAutocomplete;
