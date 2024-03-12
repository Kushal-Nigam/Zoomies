import React from 'react'
import Pets from './Pets';

 const JsonDataDisplay = ({ data }) => {
     return (
         <>
               {data.map(info => 
               <Pets key={info.id} data={info}/>
            )}
         </>
     )
 }
 
 
 export default JsonDataDisplay;