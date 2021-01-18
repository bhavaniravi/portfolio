
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
                href={social.url}
                aria-label={social.url}>
                <span>
                    <i className={`fa ${social.className}`}></i>
                </span>
                {social.name}
            </a></li>
        ))
    )
}