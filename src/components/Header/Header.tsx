import * as React from "react"
import "./Header.scss"
import { Search } from "../Search/Search"
import { AddMovie } from "../AddMovie/AddMovie"

const Header: React.FunctionComponent = () => (
    <div className="header row">
        <Search />
        <AddMovie />
    </div>
)

export { Header }
