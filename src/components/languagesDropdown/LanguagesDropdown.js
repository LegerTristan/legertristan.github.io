import { useContext } from 'react';
import Select from 'react-select';
import useTranslation from '../../hooks/useTranslation';
import languagesData from './LanguagesData';
import LanguageContext from './LanguagesContext';
import "./LanguagesDropdown.css";

function LanguagesDropdown() {
    const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
    const texts = useTranslation('LanguagesDropdown');

    const formatOptionLabel = (language) => (
        <div className="LanguageFlagItem">
            <img src={language.img} alt={language.alt} />
        </div>
    );

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#050505',
            border: state.isFocused ? '1px solid #4da3ff' : '1px solid #1a1a1a',
            boxShadow: 'none',
            minHeight: '32px',
            width: '65px',
            cursor: 'pointer',
            transition: '0.3s'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#0a0a0a',
            border: '1px solid #1a1a1a',
            width: '65px',
            right: 0
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#1a1a1a' : 'transparent',
            padding: '5px',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 5px'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: '2px',
            color: '#444'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        })
    };

    return (
        <div className="LanguagesDropdownContainer">
            <p className="LanguageLabelText">{texts.language}</p>
            <div className="SelectWrapper">
                <Select
                    options={languagesData}
                    defaultValue={currentLanguage}
                    formatOptionLabel={formatOptionLabel}
                    onChange={(selectedOption) => setCurrentLanguage(selectedOption)}
                    styles={customStyles}
                    isSearchable={false}
                />
            </div>
        </div>
    );
}

export default LanguagesDropdown;