import react from 'react';

const OpenAddBridgeFormButton: react.FC =  () => {
    return (
        <button className='bg-buttonPrimary p-2 font-lato text-white rounded-lg w-48 flex items-center justify-center hover:bg-buttonPrimary/50 hover:scale-95 duration-200 tracking-wide'>
            <i className="fas fa-plus mr-2"></i>
            Add new bridge
        </button>
    )
}

export default OpenAddBridgeFormButton