/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Grid, TextField, Autocomplete, Chip, Typography } from "@mui/material";
import { google } from "google-maps";
import axios from "axios";

interface propInf{
  setCode:React.Dispatch<React.SetStateAction<string>>
}

const MapsAutocompleteAir: React.FC<propInf> = ({setCode}) => {
  const [textValue, setTextValue] = useState<string | null>(null);

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

      setTextValue(place.formatted_address);
      ref.current.value = "";

      //find airport code against city
      const lat = place.geometry?.location.lat();
      const lng = place.geometry?.location.lng();
      const apiUrl = `http://www.iatageo.com/getCode/${lat}/${lng}`;


        //response of iata

        const responseOfIata = await axios.get(apiUrl);
        const dataOfIata = responseOfIata.data;
    
        // Handle the API response data here
        setCode(dataOfIata.IATA)
    },
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Backspace") {
      console.log("backspace pressed");
      if (textValue != null) {
        console.log("making it null");
        setTextValue(null);
      }
    }
  };

  return (
    <>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <div style={{ width: "100%", marginTop: "20px" }}>
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            inputRef={ref}
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

export default MapsAutocompleteAir;
