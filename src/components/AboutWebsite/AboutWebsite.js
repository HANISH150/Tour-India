import React from 'react'
import './AboutWebsite.css'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'
import {useSelector} from 'react-redux'
function AboutWebsite() {
  let userTheme = useSelector(state=>state.theme)
  return (
    <>
      <div className="information container mx-auto  col-11 m-5 pt-1" >
        <Accordion allowToggle>
            <AccordionItem  >
                <h2>
                <AccordionButton style={{background:"none",border:"none"}}>
                    <Box flex='1' textAlign='left'>
                    <h6 className={`website-information ${userTheme && 'text-light'}`}>ABOUT WEBSITE..</h6>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                <div className={`website-information container ${userTheme && 'text-light'}`}>
                <h4>- This website allows to go through the top 100 places all over INDIA and add them to your favourites
                for further planning</h4>
                <h4>- Now the website also supports dark theme!!</h4>
                </div>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
      </div>
      {/* <div className="p-4"  style={{background:"linear-gradient(to left,white,#f7f7f7)"}} >
        <h3>ABOUT WEBSITE...</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda est asperiores cupiditate vitae dolor, possimus ducimus adipisci. Ullam, aliquam dolorum fuga rem quo nulla sit atque consequuntur culpa voluptate non.</p>
      </div> */}
    </>
  )
}

export default AboutWebsite
