import { Grid, TextField, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { data } from '../JsonData/Data';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function Home() {
    const classes = useStyles();
    const [inputTextName, setInputTextName] = useState("");
    const [inputTextPrice, setInputTextPrice] = useState("");
    const [inputTextLocation, setInputTextLocation] = useState("");
    const [inputTextType, setInputTextType] = useState("");
    const [inputTextDate, setInputTextDate] = useState("");
    const [filterData, setFilterData] = useState(data);

    let inputHandlerName = (e) => {
        setInputTextName(e.target.value);
    };

    let inputHandlerPrice = (e) => {
        setInputTextPrice(e.target.value);
    };
    let inputHandlerLocation = (e) => {
        setInputTextLocation(e.target.value);
    };
    let inputHandlerType = (e) => {
        setInputTextType(e.target.value);
    };
    let inputHandlerDate = (e) => {
        setInputTextDate(e.target.value);
    };

    const filteredDataPrice = (data, filterPrice) => {
        // console.log({ filterPrice })
        if (!filterPrice) {
            return data;
        } else {
            // console.log("filter: ",data?.filter((ep) => ep.price.toString().includes(filterPrice)))
            return data?.filter((ep) => ep.price.toString().includes(filterPrice))
        }
    }

    const filteredDataLocation = (data, location) => {
        // console.log({ location })
        if (!location) {
            return data;
        } else {
            //   console.log("location filter: ",data?.filter((ep) => ep.location.toString().includes(location)))
            return data?.filter((ep) => ep.location.toLowerCase().includes(location))
        }
    }

    const filteredDataType = (data, type) => {
        // console.log({ type })
        if (!type) {
            return data;
        } else {
            //   console.log("location filter: ",data?.filter((ep) => ep.location.toString().includes(location)))
            return data?.filter((ep) => ep.type.toLowerCase().includes(type))
        }
    }

    const filteredDataName = (data, filterName) => {
        // console.log({ filterName })
        if (!filterName) {
            return data;
        } else {
            // console.log("filter: ",data?.filter((ep) => ep.price.toString().includes(filterPrice)))
            return data?.filter((ep) => ep.name.toLowerCase().includes(filterName))
        }
    }

    const filteredDataDate = (data, filterDate) => {
        // console.log({ filterDate })
        if (!filterDate) {
            return data;
        } else {
            // console.log("filter: ",data?.filter((ep) => ep.price.toString().includes(filterPrice)))
            return data?.filter((ep) => ep.date.toString().includes(filterDate))
        }
    }

    const filterDataFunction = (data, filterPrice = "", filterLocation = "", filterType = "", filterDate = "") => {
        let dataAfterFilter = filteredDataPrice(data, filterPrice);
        dataAfterFilter = filteredDataLocation(dataAfterFilter, filterLocation);
        dataAfterFilter = filteredDataType(dataAfterFilter, filterType);
        dataAfterFilter = filteredDataDate(dataAfterFilter, filterDate);
        setFilterData(dataAfterFilter)
    }

    const filterDataFunctionName = (data, filterName = "") => {
        let dataAfterFilter = filteredDataName(data, filterName);
        setFilterData(dataAfterFilter)
    }

    useEffect(() => {

        filterDataFunctionName(data, inputTextName)

    }, [inputTextName])

    // console.log(data);
    return (
        <div className='px-5 py-10 bg-lightPurple'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>Search Properties to rent</h1>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Search"
                    onChange={inputHandlerName}
                />
            </div>
            <div className='bg-white mt-10'>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    filterDataFunction(data, inputTextPrice, inputTextLocation, inputTextType, inputTextDate)
                }}>
                    <div className='flex justify-between p-3'>
                        <div>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Location"
                                onChange={inputHandlerLocation}
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                type="date"
                                onChange={inputHandlerDate}
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Price"
                                type="number"
                                onChange={inputHandlerPrice}
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Property Type"
                                onChange={inputHandlerType}
                                required
                            />
                        </div>
                        <div className='mt-2'>
                            <Button variant="contained" color="primary" type="submit" >
                                Search
                            </Button>
                        </div>
                        <div className='mt-2'>
                            <Button variant="contained" color="warning" onClick={() => filterDataFunction(data)}>Clear</Button>
                        </div>
                    </div>
                </form>
            </div>


            <Grid container>
                {filterData?.map((item) => (
                    <Grid item xs={12} md={4} lg={4} className="p-5">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={item.img_url}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <div className='flex justify-between text-gray-500'>
                                        <h1 className='text-purple text-2xl font-bold'>
                                            ${item.price}<p className='inline text-gray-500 text-lg'>/month</p>
                                        </h1>
                                        <FavoriteIcon className='mt-2' />
                                    </div>
                                    <h1 className='text-2xl pb-3 font-bold'>
                                        {item.name}-<h1 className='text-xl pb-3 inline text-gray-500'>{item.type}</h1>
                                    </h1>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.location}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className='pt-3'>
                                        {item.date}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <div className='flex justify-between p-5 -mt-4'>
                                <div className='text-purple flex'>
                                    <HotelIcon />
                                    <p className='pl-1 text-gray-500'>{item.bed} Beds</p>
                                </div>
                                <div className='text-purple flex'>
                                    <BathtubIcon />
                                    <p className='pl-1 text-gray-500'>{item.bathroom} Bathroomes</p>
                                </div>
                                <div className='text-purple flex'>
                                    <PeopleIcon />
                                    <p className='pl-1 text-gray-500'>{item.member} m^</p>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
