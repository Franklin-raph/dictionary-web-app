import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ toggleBackground }) => {
    const [fontPallete, setFontPallete] = useState(false)
    const [fonts, setFonts] = useState(['serif', 'sans-serif', 'monospace'])
    const [currentFontFamily, setCurrentFontFamily] = useState(fonts[0])
    const [keyword, setKeyword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [responseObject, setResponseObject] = useState({})
    const [meanings, setMeanings] = useState([])
    const [audio, setAudio] = useState("")
    const [sourceUrl, setSourceUrl] = useState("")
    const [loading, setLoading] = useState(false)

    async function getMeaning(e) {
        e.preventDefault()
        if (!keyword) {
            setErrorMessage("Please Enter a Text")
            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
            return
        }
        setLoading(true)
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`)
        const data = await response.json()
        console.log(response)
        console.log(data)
        if (response) setLoading(false)
        if (response.ok) {
            setResponseObject(data[0])
            setMeanings(data[0].meanings)
            setAudio(data[0].phonetics[0].audio)
            setSourceUrl(data[0].sourceUrls[0])

            if (!data[0].phonetics[0].audio) {
                setAudio(data[0].phonetics[1].audio)
            }

            if (!data[0].phonetics[1].audio) {
                setAudio(data[0].phonetics[2].audio)
            }
        }

        if (!response.ok) {
            console.log(data.title)
            setErrorMessage(data.title)
        }
    }

    let audioPlayer = new Audio(audio)
    const startAudio = () => {
        return audioPlayer.play()
    }

    function changeFontFamily(e) {
        setCurrentFontFamily(e.target.innerText)
    }

    function toggleFontPallete() {
        setFontPallete(!fontPallete)
    }

    return (
        <div style={{ fontFamily: currentFontFamily }}>
            <div className='flex items-center justify-between'>
                <i className="ri-book-2-line text-gray-400 font-thin" style={{ fontSize: '2rem' }}></i>
                <div className='flex items-center justify-center gap-8'>
                    <div className="flex items-center gap-1 relative">
                        <p>{currentFontFamily}</p>
                        <i className="ri-arrow-down-s-line hover:cursor-pointer hover:text-purple-600" onClick={toggleFontPallete}></i>
                        {fontPallete &&
                            <ul className="absolute bg-slate-900 text-gray-200 top-6 z-10 p-3 rounded-md">
                                {fonts.map(font => (
                                    <li className='hover:cursor-pointer' onClick={changeFontFamily} key={font}>{font}</li>
                                ))}
                            </ul>
                        }
                    </div>
                    <span className="text-gray-400 font-thin">|</span>
                    <div className='flex items-center justify-center gap-2'>
                        <label className="toggleDarkBtn">
                            <input type="checkbox" onClick={toggleBackground} />
                            <span className="slideBtnTg round"></span>
                        </label>
                        <i className="ri-moon-line"></i>
                    </div>
                </div>
            </div>
            <form onSubmit={getMeaning} className="relative block my-7">
                <input type="text" className="w-full bg-slate-100 py-2 px-4 rounded-md focus:outline-none font-bold" onChange={(e) => setKeyword(e.target.value)} />
                <span className="absolute top-0 bottom-1 right-3 flex items-center">
                    <i className="ri-search-line h-5 w-5 text-purple-600 hover:cursor-pointer" onClick={getMeaning}></i>
                </span>
            </form>
            {
                loading ? <h3>Loading...</h3> :
                    <div className="textandAudio">
                        {errorMessage && <p className="text-center px-4 py-2 bg-red-600 text-white">{errorMessage}</p>}
                        <div className="flex justify-between items-center mb-7">
                            <div>
                                <h3 className="text-5xl font-bold text-gray-700">{responseObject && responseObject.word}</h3>
                                <p className="text-purple-400 text-xl pt-2 font-[sans-serif]">{responseObject && responseObject.phonetic}</p>
                            </div>
                            {audio ?
                                <div>
                                    <i className="ri-volume-up-line text-purple-900 rounded-full p-4 bg-purple-200 text-xl cursor-pointer hover:bg-purple-300 transition-all" onClick={startAudio}></i>
                                </div>
                                :
                                null
                            }

                        </div>
                        {meanings && meanings.map(meaning => (
                            <div>
                                <div className="flex items-center justify-center gap-5">
                                    <p className="font-bold my-6 text-2xl italic">
                                        {meaning.partOfSpeech}
                                    </p>
                                    <div className="h-0.5 bg-slate-200 w-full"></div>
                                </div>
                                <h5 className="text-gray-500 text-lg">Meaning</h5>
                                <ul className="ml-9 mt-3">
                                    {meaning.definitions.map(definition => (
                                        <li className="list-disc text-purple-500">
                                            <div className="text-black">
                                                <p>{definition.definition}</p>
                                                {definition.example && <p className="my-3 text-slate-600">"{definition.example}"</p>}

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {meaning.synonyms.length > 0 &&
                                    <div className="flex align-center gap-5 mt-7">
                                        <h3 className="text-gray-500 text-lg">Synonyms</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {meaning.synonyms.map(synonym => (
                                                <p className="font-bold text-purple-600 text-lg" key={synonym[synonym]}>{synonym}</p>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                        {sourceUrl &&
                            <div className="text-gray-500 flex items-center mt-12 gap-4">
                                <p>Source</p>
                                <span className='hover:text-purple-600 flex items-center transition-all'>
                                    <Link to={sourceUrl} className="underline pr-2">{sourceUrl}</Link>
                                    <i className="ri-external-link-fill"></i>
                                </span>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default Header