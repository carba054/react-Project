import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Units from '../../components/units'
// import getCookie from '../../utils/cookie'
// import styles from './index.module.css'
import DivGrid from '../../components/grid'

const Factory = () =>{

  return (
        <PageLayout>
          <Title title="Factory" />
          <DivGrid cssName={"twoColumns"}>
            <Units buy={true}/>
          </DivGrid>
        </PageLayout>
      )
}

export default Factory

// const ShareThoughtsPage = () => {

//   const [publication, setPublication] = useState('')
//   const [updatedOrigami, setUpdatedOrigami] = useState([])

//   const handleSubmit = async () => {
//     await fetch('http://localhost:9999/api/origami', {
//       method: 'POST',
//       body: JSON.stringify({
//         description: publication
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': getCookie('x-auth-token')
//       } 
//     })

//     setPublication('')
//     setUpdatedOrigami([...updatedOrigami, 1])
//   }

//   return (
//     <PageLayout>
//       <Title title="Share your thoughts..." />
//       <div className={styles.container}>
//         <div>
//           <textarea className={styles.textArea} value={publication} onChange={e => setPublication(e.target.value)} />
//         </div>
//         <div>
//           <SubmitButton title="Post" onClick={handleSubmit} />
//         </div>
//       </div>
//       <Origamis length={3} updatedOrigami={updatedOrigami} />

//     </PageLayout>
//   )
// }


// export default ShareThoughtsPage