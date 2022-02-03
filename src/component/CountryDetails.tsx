import React, { useEffect, useState } from "react"
import Loading from "./CircularProgress"
import axios from "axios";
import {useParams} from "react-router-dom";
import {Paper,Box,Container,TableContainer,Table,TableBody,TableHead,TableRow,TableCell,Grid,Button,Avatar,Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    root:{
        height:"600px",
        width:"600px",
        margin:"20px auto"
    }
})

interface InitCountryInfo{
    capital:string[],
    population:number,
    latlng:number[],
    flags:{
        png:string
    }

}

interface InitWeatherInfo{
    temperature:number,
    weather_icons:string[]
    wind_speed:number,
    precip:number,

}
interface Iprop{
   countryName:string
}

const CountryDetails:React.FC = ()=>{
    const {countryName} = useParams<Iprop>();
  
    const [countryInfo ,setCountryInfo] = useState<InitCountryInfo>()
    const [countryLoading,setCountryLoading] = useState<boolean>(false);
   
    const [weatherInfo ,setWeatherInfo] = useState<InitWeatherInfo>()
    const [ weatherLoading, setWeatherLoading ] =useState<boolean>(false)
     
    const getApi = async()=>{
       try{
        setCountryLoading(true)
        const {data} = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        console.log(data);
        setCountryInfo(data[0]);
        setCountryLoading(false);
        //console.log(data);
       }
       catch(err){
               //setCountryLoading(false);
               console.log(err)
       }
    }

    const showWeatherDetails = async()=>{
        try{
            setWeatherLoading(true);
            const {data} = await axios.get(`http://api.weatherstack.com/current?access_key=eda4107a70c1eef3d94adab5ac9a1c2b&query=${countryInfo?.capital[0]}`);
            console.log(data);
            setWeatherInfo(data.current);
            setWeatherLoading(false);
            console.log(data);
           }
           catch(err){
                   setWeatherLoading(false)
                   console.log(err)
           }
    }

    useEffect(()=>{
        getApi();
    },[])

    const classes = useStyle();
    return(
        <div data-testid="details">
        <Container maxWidth="sm">
             <Typography align="center" color="primary" variant="h6">{countryName}</Typography>
         <Grid container direction="column" spacing={2}>
             { countryLoading ?  <Loading/> :
            
               <Paper component={Box} mt={4} >
                  <Grid container item spacing={1}>
                         <Grid item xs={12} sm={6} sx={{height:"200px"}} >
                             
                             <TableContainer>
                                 <Table>
                                     <TableBody>
                                        
                                        <TableRow>
                                            <TableCell>Capital</TableCell>
                                            <TableCell>{countryInfo?.capital[0]}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                             <TableCell>Population</TableCell>
                                            <TableCell>{countryInfo?.population}</TableCell>
                                       </TableRow> 
                                       <TableRow>
                                             <TableCell>Latlng</TableCell>
                                            <TableCell>{countryInfo?.latlng[0]}</TableCell>
                                       </TableRow>
                                    </TableBody>
                                 </Table>
                             </TableContainer>
                         </Grid>

                          <Grid item xs={12} sm={6} >
                            <Avatar  src={countryInfo?.flags.png} alt="Flag" variant="square" sx={{height:"200px",width:"auto"}}  />
                         </Grid>

                         <Grid item xs={12}>
                            <Button  fullWidth variant="outlined" onClick={showWeatherDetails}>Show Weather Details</Button>
                        </Grid>
                   </Grid>
                </Paper>
            }  


            { weatherLoading ? <Loading/> :

                   weatherInfo  &&

                <Paper component={Box} mt={2}>
                   <Grid container item>
                           <Grid item xs={12} sm={6}>
                              <TableContainer>
                                   <Table>
                                     <TableBody>
                                        <TableRow>
                                            <TableCell>Temperature</TableCell>
                                            <TableCell>{weatherInfo?.temperature}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                             <TableCell>Wind Speed</TableCell>
                                             <TableCell>{weatherInfo?.wind_speed}</TableCell>
                                       </TableRow> 
                                       <TableRow>
                                             <TableCell>Precip</TableCell>
                                             <TableCell>{weatherInfo?.precip}</TableCell>
                                       </TableRow>
                                    </TableBody>   
                                 </Table>
                              </TableContainer>
                           </Grid>
                           
                            <Grid item xs={12} sm={6} >
                               <Avatar src={weatherInfo?.weather_icons[0]} alt="Flag" variant="square" sx={{height:"200px",width:"auto"}} />
                           </Grid>
                   </Grid>
                </Paper>
                }
              </Grid>
          </Container>
        </div>
    )
}
export default CountryDetails;