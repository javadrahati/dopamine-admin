import React, {useEffect, useRef, useState} from "react";
import {
	CBadge,
	CButton, CCol,
	CDropdown,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle,
	CFormInput, CRow,
	CSpinner
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilExpandDown} from "@coreui/icons";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

const CMultiSelect = ({
						  placeholder= "...",
						  multiple= true,
						  options = [],
						  values = [],
						  onSelectionUpdate = (values) => {},
						  ...restProps
					  }) => {

	const [selectedItems, setSelectedItems] = useState([])
	const [show, setShow] = useState(false)
	const [searchKeyword, setSearchKeyword] = useState("")
	const [listItems, setListItems] = useState(options)

	const wrapperRef = useRef(null)
	useOutsideAlerter(wrapperRef, () => {setShow(false)})

	useEffect(() => {
		if(values != null && values.length > 0) {
			setSelectedItems(
				multiple ?
					options.filter(e => values.indexOf(e.value) >= 0) :
					(options.length > 0 ? options[0] : [])
			)
		}
		return () => {}
	}, [values, options])

	useEffect(() => {
		if(searchKeyword == null || searchKeyword.length <= 0) {
			setListItems(options)
		} else {
			setListItems(
				options.filter(e => e.text.toLowerCase().includes(searchKeyword.toLowerCase()))
			)
		}
		return () => {}
	}, [searchKeyword, options])

	const toggleSelection = item => {
		let items = []
		if(selectedItems.findIndex(e => e.value === item.value) < 0) {
			items = multiple ? selectedItems.concat(item) : [item];
		} else {
			items = selectedItems.filter(e => e.value !== item.value)
		}
		setSelectedItems(items)
		onSelectionUpdate && onSelectionUpdate(items)
		setSearchKeyword("")
	}

	const isSelected = item => selectedItems.findIndex(e => e.value === item.value) >= 0
	const isClear = () => selectedItems.length === 0
	const clearSelection = (e) => {
		e.stopPropagation()
		setSelectedItems([])
		onSelectionUpdate && onSelectionUpdate([])
		setSearchKeyword("")
		setShow(false)
	}

	const removeLastSelection = () => {
		if(selectedItems.length > 0) {

			let items = multiple ? selectedItems.slice(0, -1) : []
			setSelectedItems(items)
			onSelectionUpdate && onSelectionUpdate(items)
		}
	}

	const handleKeyPress = e => {
		if(e.keyCode === 8)  { // Backspace
			if(e.target.value.length <= 0 ){
				removeLastSelection()
			}
		} else if(e.keyCode === 27) { // Escape
			setShow(false)
		}
	}

	return (
		<div ref={wrapperRef} {...restProps}>
			<div className={["form-multi-select", "form-multi-select-selection-tags", show ? "show" : ""].join(" ") }
				 onClick={() => setShow(true)}>
					<span className="form-multi-select-selection">
						{ selectedItems.map(item => (
							<span className="form-multi-select-tag"
								  key={item.value}>
								{item.text}
								<button className="form-multi-select-tag-delete" aria-label="close" type="button">
									<span aria-hidden={true} onClick={e => {
										e.stopPropagation()
										toggleSelection(item)
									}}>×</span>
								</button>
							</span>
						))}
					</span>
				<input type="text"
					   className="form-multi-select-search"
					   size={3}
					   placeholder={isClear() ? placeholder : null}
					   onKeyDown={handleKeyPress}
					   onFocus={_ => setShow(true)}
					   value={searchKeyword}
					   onChange={e => setSearchKeyword(e.target.value)}
				/>
				<button type="button" className="form-multi-select-selection-cleaner" onClick={clearSelection}/>
				<div className="form-multi-select-dropdown">
					<div className="form-multi-select-options">
						{listItems.map((option, idx) => (
							<div
								className={
									[
										"form-multi-select-option",
										"form-multi-select-option-with-checkbox",
										isSelected(option) ? "form-multi-selected" : "",
									].join(" ")
								}
								key={option.value}
								onClick={() => toggleSelection(option)} >
								{option.text}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>

	)
}

export default CMultiSelect