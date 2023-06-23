'use client'

import React from 'react'
import { useState, useEffect } from 'react'

export default function example({data}) {
  return(
    <div>
     {data}
    </div>
  )
}

export async function getServerSideProps() {
  const sheetId = '1mEK2DGItUfHPtrHvxKflvTyKYM_FbZJNvb4ZaUeEbhY';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'List content';
  const query = encodeURIComponent('Select *')
  const url = `${base}&sheet=${sheetName}&tq=${query}`

  const res = await fetch(url)
  let text = res.text()
  const json = JSON.parse(`${text.substr(47).slice(0, -2)}`);

  return {
    props: {
      data: json,
    },
  };
}