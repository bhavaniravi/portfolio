import React from "react"

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', DATE_OPTIONS)
}

export function socialComponents(icons) {
    return (
        icons.map(social => (
            <li><a target="_blank"
                rel="noopener noreferrer"
                href={social.url}>
                <i className={`fa ${social.className}`}></i>
                {social.name}
            </a></li>
        ))
    )
}