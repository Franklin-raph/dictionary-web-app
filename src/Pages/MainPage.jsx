import { useState } from 'react'
import LoadinGif from '../assets/images/65ba488626025cff82f091336fbf94bb.gif'
import Body from '../components/Body'
import Header from "../components/Header"

const MainPage = () => {
    const [darkToggle, setDarkToggle] = useState(false)
    const [dictionaryData, setDictionaryData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [audioFile, setAudioFIle] = useState("")
    const fonts = ['serif', 'monospace', 'Poppins', 'Montserrat']
    const [currentFontFamily, setCurrentFontFamily] = useState(fonts[0])

    function toggleBackground() {
        setDarkToggle(!darkToggle)
    }

    function changeFontFamily(e) {
        setCurrentFontFamily(e.target.innerText)
    }

    async function getMeaning(e) {
        e.preventDefault()
        if (!e.target.elements.dictionaryKeyword.value) {
            setErrorMessage("Please Enter a Text")
            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
            return
        }
        setLoading(true)
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.elements.dictionaryKeyword.value}`)
        const data = await response.json()

        if (response.ok) {
            setLoading(false)
            setDictionaryData(data[0])

            setAudioFIle(data[0].phonetics[0].audio)
            if (!data[0].phonetics[0].audio) {
                setAudioFIle(data[0].phonetics[1].audio)
            }

            if (!data[0].phonetics[1].audio) {
                setAudioFIle(data[0].phonetics[2].audio)
            }
        } else {
            setLoading(false)
            setErrorMessage(data.title)
            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
        }
    }

    return (
        <div className={`lg:w-2/4 md:w-3/4 sm:w-full p-8 px-4 mx-auto wrapper ${darkToggle && 'dark'}`} style={{ fontFamily: currentFontFamily }}>
            <Header toggleBackground={toggleBackground} getMeaning={getMeaning} currentFontFamily={currentFontFamily} fonts={fonts} changeFontFamily={changeFontFamily} darkToggle={darkToggle} />
            {loading ? <img src={LoadinGif} alt="Loading Image..." /> :
                <>
                    {
                        errorMessage ?
                            <p className="text-center px-4 py-2 bg-red-600 text-white">
                                {errorMessage}
                            </p>
                            :
                            <>
                                {dictionaryData && <Body dictionaryData={dictionaryData} audioFile={audioFile} loading={loading} />}
                            </>
                    }
                </>
            }
        </div>
    )
}

export default MainPage