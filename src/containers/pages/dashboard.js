import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Table } from '../../components'
import { Exoplanet } from '../../actions/exoplanet'

const Dashboard = ({getExoplanet, exoplant}) => {

    useEffect(() => {
      getExoplanet()
      },[]);

    return(
     <Table exoplant={exoplant}/>
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
