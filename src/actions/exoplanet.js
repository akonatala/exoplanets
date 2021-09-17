import {getExoplanetData} from '../service';
import { ActionType } from '../reducers/exoplanet'

export const Exoplanet = () => {
  return (dispatch) =>
    new Promise((resolve) => {
        getExoplanetData().then((response) => {
          console.log('a1', response)
        dispatch({ type: ActionType.GetExoPlanet, value: response });
        resolve(response);
      });
    });
};
