// icon:chevron-down | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from 'react'

function IconChevronDown(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            {...props}
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M6 9l6 6 6-6" />
        </svg>
    )
}

export default IconChevronDown
