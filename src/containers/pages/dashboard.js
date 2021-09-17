import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Exoplanet } from '../../actions/exoplanet'
import "react-virtualized/styles.css";
import _ from "lodash";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import {Spinner} from "react-bootstrap"


const Dashboard = ({getExoplanet}) => {
  const [data, dataSet] = useState(null)
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [list, setList] = useState({})

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getExoplanet()
      const data = Object.values(response)
      dataSet(data)
    }

    fetchMyAPI()
  }, [getExoplanet])

  useEffect(() => {
    if(data !== null) {
      setIsSpinnerVisible(false)
    } else {
      setIsSpinnerVisible(true)
    }
  },[data]);
    
  const sortList = ({ sortBy, sortDirection }) => {
    let newList = _.sortBy(data, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };

  const sort = ({ sortBy, sortDirection }) => {
    const sortedList = sortList({ sortBy, sortDirection });
    setList(sortedList)
  };

  const [sortBy, setSortBy] = useState('kepler_name')
  const [sortDirection, setSortDirection] = useState(SortDirection.ASC)
  const sortedList = sortList({ sortBy, sortDirection });

  const onSortBySelectHandler = (e) => {
    setSortBy(e.target.value);
  };

  const onSortDirectionSelectHandler = (e) => {
    setSortDirection(e.target.value);
  };

    return(
      <>
      <h1>Table of Exoplanets</h1>
      <br/>
      {isSpinnerVisible && 
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    }
      {!isSpinnerVisible &&
      <>
      <label>Sort By </label>
      <select onChange={onSortBySelectHandler}>
        <option value="kepler_name">kepler_name</option>
        <option value="koi_score">koi_score</option>
      </select>
      <label>Sort Direction </label>
      <select onChange={onSortDirectionSelectHandler}>
        <option value={SortDirection.ASC}>Ascending</option>
        <option value={SortDirection.DESC}>Descending</option>
      </select>
      <br/>
      <br/>
        <div style={{ height: 400, width: 400 }}>
        <AutoSizer>
          {() => (
            <Table
              width={900}
              height={400}
              headerHeight={20}
              rowHeight={30}
              sort={sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              rowCount={sortedList.length}
              rowGetter={({ index }) => sortedList[index]}
            >
              <Column width={200} label="kepid" dataKey="kepid" />
              <Column width={300} label="kepler_name" dataKey="kepler_name" />
              <Column width={300} label="koi_score" dataKey="koi_score" />
              <Column width={300} label="koi_period" dataKey="koi_period" />
              <Column width={300} label="ra_str" dataKey="ra_str" />
              <Column width={300} label="koi_kepmag" dataKey="koi_kepmag" />
            </Table>
          )}
        </AutoSizer>
      </div>
      </>
      }
      </>
    )
}



const mapStateToProps = state => {
    const { exoplant } = state
    return {exoplant}
  }
  
  const mapDispatchToProps = dispatch => {
    return({
      getExoplanet:() => dispatch(Exoplanet()),
    })
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
