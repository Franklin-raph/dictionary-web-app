import { useState } from 'react'

const Header = () => {
    const [fontFamily, setFontFamily] = useState("Serif")
    const [keyword, setKeyword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [responseObject, setResponseObject] = useState({})
    const [meanings, setMeanings] = useState([])
    const [audio, setAudio] = useState("")

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
            if (!data[0].phonetics[0].audio) {
                setAudio(data[0].phonetics[1].audio)
            }

            if (!data[0].phonetics[1].audio) {
                setAudio(data[0].phonetics[2].audio)
            }

            // if(!data[0].phonetics[2].audio){
            //     setAudio(data[0].phonetics[1].audio)
            // }
        }

        if (!response.ok) {
            setErrorMessage(data.title)
        }
        console.log(data)
    }
    console.log(audio)

    let audioPlayer = new Audio(audio)
    const startAudio = () => {
        return audioPlayer.play()
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <i className="ri-book-2-line text-gray-400 font-thin" style={{ fontSize: '2rem' }}></i>
                <div className='flex items-center justify-center gap-8'>
                    <p>{fontFamily}</p> <span className="text-gray-400 font-thin">|</span> <i className="ri-moon-line"></i>
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
                        <p className="text-purple-400 text-xl">{responseObject && responseObject.phonetic}</p>
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
                        <p>
                            {meaning.partOfSpeech}
                        </p>
                        {meaning.definitions.map(definition => (<li>{definition.definition}</li>))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Header