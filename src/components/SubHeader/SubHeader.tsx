import * as React from "react"
import "./SubHeader.scss"

import { ClasificationMovie } from "../ClasificationMovie/ClasificationMovie"

import { SortMovie } from "../SortMovie/SortMovie"
import sortOptions from "../../data/sorts.json"

import clasificationTypes from "../../data/clasifications.json"

const SubHeader: React.FunctionComponent = () => (
    <div className="sub-header">
        <div className="clasification-movies">
            <ClasificationMovie clasificationTypes={clasificationTypes} />
        </div>
        <div className="sort-movies">
            <SortMovie sortOptions={sortOptions} />
        </div>
    </div>
)

export { SubHeader }
