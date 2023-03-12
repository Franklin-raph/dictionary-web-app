import { useState } from 'react'

const Header = ({ toggleBackground, getMeaning, changeFontFamily, currentFontFamily, fonts, darkToggle, setSearchKeyword }) => {
    const [fontPallete, setFontPallete] = useState(false)
    const [keyword, setKeyword] = useState("")

    function toggleFontPallete() {
        setFontPallete(!fontPallete)
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <i className="ri-book-2-line text-gray-400 font-thin" style={{ fontSize: '2rem' }}></i>
                <div className='flex items-center justify-center gap-5'>
                    <div className="flex items-center gap-1 relative">
                        <div onClick={toggleFontPallete} className="flex items-center gap-1 cursor-pointer bg-purple-300 px-2 rounded-md">
                            <p>{currentFontFamily}</p>
                            <i className="ri-arrow-down-s-line hover:cursor-pointer hover:text-purple-600"></i>
                        </div>
                        {fontPallete &&
                            <ul className="absolute bg-slate-900 text-gray-200 top-7 z-10 p-3 rounded-md">
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
                        {!darkToggle ? <i className="ri-moon-line"></i> : <i className="ri-sun-line"></i>}
                    </div>
                </div>
            </div>
            <form onSubmit={e => getMeaning(e)} className="relative block my-7">
                <input type="search" name='dictionaryKeyword' id='test' className="w-full bg-slate-100 py-2 px-4 rounded-md focus:outline-none font-bold" onChange={(e) => setKeyword(e.target.value)} />
                <span className="absolute top-0 bottom-1 right-3 flex items-center">
                    <i className="ri-search-line h-5 w-5 text-purple-600 hover:cursor-not-allowed"></i>
                </span>
            </form>
        </div>
    )
}

export default Header