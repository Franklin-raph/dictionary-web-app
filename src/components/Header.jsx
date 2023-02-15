import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ toggleBackground }) => {
    const [fontFamily, setFontFamily] = useState("Serif")
    const [keyword, setKeyword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [responseObject, setResponseObject] = useState({})
    const [meanings, setMeanings] = useState([])
    const [audio, setAudio] = useState("")
    const [sourceUrl, setSourceUrl] = useState("")

    async function getMeaning(e) {
        e.preventDefault()
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`)
        const data = await response.json()
        console.log(response)
        console.log(data)
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
            setErrorMessage(data.title)
        }
    }

    let audioPlayer = new Audio(audio)
    const startAudio = () => {
        return audioPlayer.play()
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <i className="ri-book-2-line text-gray-400 font-thin" style={{ fontSize: '2rem' }}></i>
                <div className='flex items-center justify-center gap-8'>
                    <p>{fontFamily}</p> <span className="text-gray-400 font-thin">|</span>
                    <div className='flex items-center justify-center gap-2'>
                        <label class="toggleDarkBtn">
                            <input type="checkbox" onClick={toggleBackground} />
                            <span class="slideBtnTg round"></span>
                        </label>
                        <i className="ri-moon-line"></i>
                    </div>
                </div>
            </div>
            <form onSubmit={getMeaning} className="relative block my-7">
                <input type="text" className="w-full bg-slate-100 py-2 px-4 rounded-md focus:outline-none" onChange={(e) => setKeyword(e.target.value)} />
                <span className="absolute top-0 bottom-1 right-3 flex items-center">
                    <i className="ri-search-line h-5 w-5 text-purple-400"></i>
                </span>
            </form>
            <div className="textandAudio">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-5xl font-bold text-gray-700">{responseObject && responseObject.word}</h3>
                        <p className="text-purple-400 text-xl pt-2">{responseObject && responseObject.phonetic}</p>
                    </div>
                    {audio ?
                        <div>
                            <i className="ri-volume-up-line text-purple-900 rounded-full p-4 bg-purple-200 text-xl" onClick={startAudio}></i>
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
                                <p className="font-bold text-purple-600 text-lg">{meaning.synonyms}</p>
                            </div>
                        }
                    </div>
                ))}
                {sourceUrl &&
                    <p className="text-gray-500 flex items-center">Source <Link to={sourceUrl} className="underline pl-4 pr-2">{sourceUrl}</Link> <i className="ri-external-link-fill"></i> </p>
                }
            </div>
        </div>
    )
}

export default Header