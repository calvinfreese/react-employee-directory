import React from 'react';

function SearchBar({searchField, searchChange}) {
    return (
        <form>
            <div className="form-group">
                <label> Employee Search: 
                    <input 
                    className="form-control" 
                    type="search" 
                    name="search" 
                    onChange={searchChange} 
                    />
                </label>
            </div>
        </form>
    );
}
export default SearchBar;