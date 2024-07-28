import React, {useState} from 'react'
import Cards from '../../components/Cards/Cards'
import PDFCard from '../../components/Cards/PDFCard'
import Modal from '../../components/Modal/Modal';
function Reports() {
    // const url = '/Blue White Simple Class Report Card.pdf'
    const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

    const handleCardClick = (pdfUrl) => {
        setSelectedPdfUrl(pdfUrl);
    }
    const handleCloseModal = () => {
        setSelectedPdfUrl(null);
    }
    const students = [
        { name: 'Anurag Bisht', date: '26/7/24', pdfUrl:'/Blue White Simple Class Report Card.pdf' },
        { name: 'Aryan Panwar', date: '25/7/24', pdfUrl:'/Blue White Simple Class Report Card.pdf' },
        { name: 'Praptika Paul', date: '24/7/24', pdfUrl:'/Blue White Simple Class Report Card.pdf' },
        { name: 'Gaurav Aggarwal', date: '23/7/24', pdfUrl:'/Blue White Simple Class Report Card.pdf' }
    ]

    return (
        // <PDFCard pdfUrl={url}/>
        <>
            <div className='flex space-x-6 ml-16'>
            {students.map((student, index) => {
                return <Cards name={student.name} date={student.date} key={index}
                onClick={() => handleCardClick(student.pdfUrl)}/>
            })}
        </div>
        {selectedPdfUrl && (
                <Modal onClose={handleCloseModal}>
                    <iframe src={selectedPdfUrl} width="1000px" height="500px" title="PDF Viewer" />
                </Modal>
            )}
        </>
    )
}

export default Reports
