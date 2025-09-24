import { CiLocationOn } from "react-icons/ci";

const LocationSearchPanel = (props) => {
    const { suggestions = [], onSuggestionClick } = props;

    return (
        <div>

            {suggestions.length === 0 ? (
                <div className="text-gray-400 p-3">No suggestions found.</div>
            ) : (
                suggestions.map((element, id) => (
                    <div key={id} onClick={() => {
                        if (onSuggestionClick) onSuggestionClick(element);
                        // if (props.setVehiclePanelOpen) props.setVehiclePanelOpen(true);
                    }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'> <CiLocationOn /> </h2>
                        <h1 className="font-medium">{element.description}</h1>
                    </div>
                ))
            )}
        </div>
    )
}

export default LocationSearchPanel