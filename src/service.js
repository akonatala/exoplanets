import axios from 'axios';

export async function getExoplanetData() {
  const response = await axios.get('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json');
  return response.data;
}
