import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import mapboxgl from 'mapbox-gl';
 
let useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    margin: 0,
  },
  map: {
    marginLeft: '30px',
    width: 600,
    height: 466,
    borderRadius: 25,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }
}))

const MapBox = () => {
  const classes = useStyles();
  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_APIKEY; 
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/astonkhor/ck8s2q3fr0rqj1impttewlsxl', 
      center: [-87.6500523, 41.850033],
      zoom: 3
    });

    map.on('click', function(e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['IndoorGyms'] // replace this with the name of the layer
      });
    
      if (!features.length) {
        return;
      }
    
      var feature = features[0];
    
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
    });
  }, []);
  

  return (
    <div className={classes.map} id="map"></div>
  ); 
}

export default MapBox;