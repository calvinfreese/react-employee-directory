import React, { Component } from 'react';

function SearchBar({searchField, searchChange}) {
 
    return (
        <form>
            <div className="form-group">
                <label> Employee Search: 
                    <input className="form-control" type="text" name="search" value={this.state.value} onChange={searchChange} />
                </label>
            </div>
        </form>
    );
}
export default SearchBar;