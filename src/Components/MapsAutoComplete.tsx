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
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  street: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;

}

const MapsAutocomplete: React.FC<AutoCompleteProps> = ({
  city,
  setCity,
  country,
  setCountry,
  state,setState,street,setStreet,
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
  
      
  
      for (const result of data.results) {
        for (const addressComponent of result.address_components) {
          if (addressComponent.types.includes("administrative_area_level_1")) {
            setState(addressComponent.long_name)
            console.log("state is ",addressComponent.long_name)
          } else if (addressComponent.types.includes("route")) {
            setStreet(addressComponent.long_name)
            console.log("street is ",addressComponent.long_name)
          }
        }
      }
  
      if (place && place.address_components && place.formatted_address) {
        for (let i = 0; i < place.address_components.length; i++) {
          if (place.address_components[i].short_name) {
            setCountry(place.address_components[i].short_name);
          }
        }
        setTextValue(place.formatted_address);
      }
  
      setCity(city);

  
      setMsg("Field set");
      triggerHiddenEffect();
      if (inputRef && inputRef.current && inputRef.current.value)
        inputRef.current.value = "";
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
      <Grid item xs={12} sx={{ width: "50%",height:"100%" }}>
        <div style={{ width: "100%"}}>
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
