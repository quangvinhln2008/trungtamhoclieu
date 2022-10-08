import React from "react";
import {
  useSearchParams,
} from "react-router-dom";

const PhieuNhap = () =>{
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('type',searchParams.get('type'))

  return(
    <>
      <p>Phieu {searchParams.get('type')}</p>
    </>
  )
}
export default PhieuNhap;