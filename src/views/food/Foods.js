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
import FoodCategoryItemView from "./FoodCategoryItemView";
import {cilLibraryAdd, cilPencil, cilPlaylistAdd, cilPlus, cilTrash, cilX} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import PostFoodCategoryModal from "./PostFoodCategoryModal";
import DeleteItemModal from "../modal/DeleteItemModal";
import CPaginationView from "../../helpers/Components/CPaginationView";
import FoodItemView from "./FoodItemView";
import PostFoodUnitModal from "./PostFoodUnitModal";
import PostFoodModal from "./PostFoodModal";
import CPageHeaderView from "../custom/CPageHeaderView";

const Foods = () => {
	const [alertMessage, setAlertMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const [list, setList] = useState([])
	const [itemToPost, setItemToPost] = useState(undefined)
	const [itemToDelete, setItemToDelete] = useState(undefined)
	const [currentPage, setCurrentPage] = useState(1)
	const [pages, setPages] = useState(4)
	const [foodUnitToPost, setFoodUnitToPost] = useState(undefined)
	const [foodUnitToDelete, setFoodUnitToDelete] = useState(undefined)


	useEffect(() => {
		fetch(currentPage)
		return () => {}
	}, [currentPage])

	const fetch = (page) => {
		if(loading) return

		setLoading(true)
		Axios.get(`food?page=${page}`).then(res => {
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
		setFoodUnitToPost(undefined)
		setFoodUnitToDelete(undefined)
	}

	const itemEditHandler = (item) => {
		setItemToPost(item)
	}

	const itemDeleteHandler = (item) => {
		setItemToDelete(item)
	}

	const foodUnitDeleteHandler = (foodUnit) => {
		setFoodUnitToDelete(foodUnit)
	}

	const foodUnitEditHandler = (foodUnit) => {
		setFoodUnitToPost(foodUnit)
	}

	const onFoodUpdated = (food) => {
		setList(list.map(e => e.id !== food.id ? e : food))
		closeModals()
	}

	const onFoodUnitUpdated = (foodUnit) => {
		setList(list.map(e => {
			if(e.id !== foodUnit.food_id) {
				return e
			} else {
				let i = e.units.findIndex(x => x.id === foodUnit.id)
				console.log(e.units)
				if(i < 0) {
					e.units.push(foodUnit)
				} else {
					e.units = e.units.map(x => x.id === foodUnit.id ? foodUnit : x)
				}
				return e
			}
		}));
		fetch(currentPage)
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
						<FoodItemView
							key={item.id}
							item={item}
							onItemEditHandler={() => itemEditHandler(item)}
							onItemDeleteHandler={() => itemDeleteHandler(item)}
							onUnitEditHandler={foodUnitEditHandler}
							onUnitDeleteHandler={foodUnitDeleteHandler}
						/>
					))}
				</CRow>
			</CContainer>

			<PostFoodModal
				item={itemToPost}
				onClose={closeModals}
				onItemUpdated={onItemPosted}
				visible={ itemToPost !==  undefined }
			/>

			<PostFoodUnitModal
				item={foodUnitToPost}
				onClose={closeModals}
				onItemUpdated={onFoodUnitUpdated}
				visible={ foodUnitToPost !==  undefined }
			/>

			<DeleteItemModal
				item={itemToDelete}
				visible={ itemToDelete !== undefined }
				onClose={closeModals}
				onDeleteResponse={onItemDeleted}
				endpoint={"food/" + (itemToDelete ? itemToDelete.id : "")}
			/>

			<DeleteItemModal
				item={foodUnitToDelete}
				visible={ foodUnitToDelete !== undefined }
				onClose={closeModals}
				onDeleteResponse={onFoodUpdated}
				endpoint={"foodUnit/" + (foodUnitToDelete ? foodUnitToDelete.id : "")}
			/>

		</CContainer>
	)
}

export default Foods
