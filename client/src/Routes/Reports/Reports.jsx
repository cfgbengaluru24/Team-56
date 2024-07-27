import React from 'react'
import Cards from '../../components/Cards/Cards'
import PDFCard from '../../components/Cards/PDFCard'

function Reports() {
    const url="client\public\Blue White Simple Class Report Card.pdf"
    return (
        <PDFCard pdfUrl={url}/>
    )
}

export default Reports
