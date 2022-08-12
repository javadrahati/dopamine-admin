import React, {useEffect, useState} from 'react'
//import {useCurrentEffect} from "../../helpers/use-current-effect";
import {
	CAlert, CBadge, CButton, CButtonGroup,
	CCard,
	CCardBody, CCardFooter, CCardGroup, CCardHeader,
	CCardImage, CCardSubtitle,
	CCardText,
	CCardTitle,
	CCol,
	CContainer, CForm, CFormInput,
	CImage, CModalFooter,
	CRow,
	CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip
} from "@coreui/react";
import Axios from "../../helpers/axios/Axios";
import DeleteItemModal from "../modal/DeleteItemModal";
import CPageHeaderView from "../custom/CPageHeaderView";
import WorkoutItemView from "./WorkoutItemView";
import PostWorkoutModal from "./PostWorkoutModal";
import CMultiSelect from "../../helpers/Components/CMultiSelect";

const Workouts = () => {
	const [alertMessage, setAlertMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const [list, setList] = useState([])
	const [itemToPost, setItemToPost] = useState(undefined)
	const [itemToDelete, setItemToDelete] = useState(undefined)
	const [currentPage, setCurrentPage] = useState(1)
	const [pages, setPages] = useState(4)


	useEffect(() => {
		fetch(currentPage)
		return () => {}
	}, [currentPage])

	const fetch = (page) => {
		if(loading) return

		setLoading(true)
		Axios.get(`workout?page=${page}`).then(res => {
			setCurrentPage(res.data.current_page || 1)
			setPages(res.data.last_page || 4)
			setList(res.data.data)
			setAlertMessage("")
			setLoading(false)
		}).catch(error => {
			setLoading(false)
			setAlertMessage(error.response.data.errorMessage ?? "")
		})
	}

	const closeModals = () => {
		setItemToPost(undefined)
		setItemToDelete(undefined)
	}

	const itemEditHandler = (item) => {
		setItemToPost(item)
	}

	const itemDeleteHandler = (item) => {
		setItemToDelete(item)
	}

	const onItemUpdated = (food) => {
		setList(list.map(e => e.id !== food.id ? e : food))
		closeModals()
	}

	const onItemPosted = (food) => {
		let index = list.findIndex(e => e.id === food.id)
		if(index < 0) {
			fetch(pages)
		} else {
			setList(list.map(e => e.id === food.id ? food : e))
		}
		closeModals()
	}

	const onItemDeleted = ({id}) => {
		setList(list.filter(e => e.id !== id))
		closeModals()
	}

	return (
		<CContainer >

			<CPageHeaderView
				loading={loading}
				onAddButtonClick={() => itemEditHandler(null)}
				pagination
				activePage={currentPage}
				pages={pages}
				onActivePageChange={setCurrentPage}
				alertMessage={alertMessage}
				onCloseAlert={() => setAlertMessage("")}
			/>

			<CContainer>
				<CRow>
					{list.map(item => (
						<WorkoutItemView
							key={item.id}
							item={item}
							onItemEditHandler={() => itemEditHandler(item)}
							onItemDeleteHandler={() => itemDeleteHandler(item)}
						/>
					))}
				</CRow>
			</CContainer>

			<PostWorkoutModal
				item={itemToPost}
				onClose={closeModals}
				onItemUpdated={onItemPosted}
				visible={ itemToPost !==  undefined }
			/>

			<DeleteItemModal
				item={itemToDelete}
				visible={ itemToDelete !== undefined }
				onClose={closeModals}
				onDeleteResponse={onItemDeleted}
				endpoint={"workout/" + (itemToDelete ? itemToDelete.id : "")}
			/>


		</CContainer>
	)
}

export default Workouts
