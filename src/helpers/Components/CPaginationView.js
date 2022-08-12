import React, {useEffect, useState} from "react"
import {CPagination, CPaginationItem} from "@coreui/react";


const CPaginationView = ({ align = "start", onActivePageChange = (n) => {console.log(n)}, activePage = 1, pages = 3, size="sm" }) => {
	const [seq, setSeq] = useState([1,2,3])
	useEffect(() => {
		if(activePage <= 3 || pages <= 4) {
			setSeq([1,2,3,4,-1])
		} else if(Math.abs(activePage-pages) <= 3) {
			setSeq([-1, pages-3, pages-2,pages-1,pages])
		} else {
			setSeq([-1, activePage-1, activePage, activePage+1, -1])
		}
		return () => {}
	}, [activePage, pages])

	return (
		<CPagination className="mt-1" aria-label="pagination" align={align}

			>
			<CPaginationItem key={-2} aria-label="First" disabled={activePage === 1} onClick={() => onActivePageChange(1)}>
				<span aria-hidden="true">&laquo;</span>
			</CPaginationItem>
			<CPaginationItem key={-1} aria-label="Previous" disabled={activePage === 1} onClick={() => onActivePageChange(activePage-1)}>
				<span aria-hidden="true">‹</span>
			</CPaginationItem>

			{ seq.map(( e, idx) => (
				<CPaginationItem key={idx} active={activePage === e} disabled={e < 0} onClick={() => onActivePageChange(e)}>
					{e < 0 ? "..." : e}
				</CPaginationItem>
			)) }

			<CPaginationItem key={-3} aria-label="Next" disabled={activePage === pages} onClick={() => onActivePageChange(activePage+1)}>
				<span aria-hidden="true">›</span>
			</CPaginationItem>
			<CPaginationItem key={-4} aria-label="Last" disabled={activePage === pages} onClick={() => onActivePageChange(pages)}>
				<span aria-hidden="true">&raquo;</span>
			</CPaginationItem>
		</CPagination>
	)
}

export default CPaginationView