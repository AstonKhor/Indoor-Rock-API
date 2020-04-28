import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import { useEffect, useState, useRef } from 'react';
import createGraph from '../methods/createBoxPlot';
import * as d3 from 'd3';

const useStyles = makeStyles((theme) => ({
  graph: {
    width: '700px',
    height: '700px',
    zIndex: 1000000,
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: 16,
  },
  padding: {
    padding: 8,
  },
  dialog: {
    width: '700px',
  },
  content: {
    backgroundColor: '#edf5e1',
  },
  tab: {
    backgroundColor: '#e8e8e8',
  }
}));


export default function Graph({ open, handleClose}) {
  const classes = useStyles();
  const ref = useRef();
  const [graph, setGraph] = useState([]);
  useEffect(() => {
    fetch('/graphData')
      .then((resp) => resp.json())
      .then((data) => {
        const svg = d3.select(ref.current);
        createGraph(data.rows, svg);
        console.log(data.rows);
        setGraph(data.rows);
      })
  }, [])

  

  return (
    <React.Fragment>
      {/* <div id="graph"></div> */}
          <div id="climbGraph" className={classes.graph}></div>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent className={classes.content}>
          HELLOOO
          <div ref={ref}/>
          {/* {createGraph(graph)} */}
        </DialogContent>
      </Dialog> 
    </React.Fragment>
  );
}