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
import CPageHeaderView from "../custom/CPageHeaderView";

const FoodCategories = () => {
	const [alertMessage, setAlertMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const [list, setList] = useState([])
	const [itemToPost, setItemToPost] = useState(undefined)
	const [itemToDelete, setItemToDelete] = useState(undefined)

	useEffect(() => {
		fetchList()
		return () => {}
	}, [])

	const fetchList = () => {
		setLoading(true)
		Axios.get('foodcategory').then(res => {
			setList(res.data)
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

	const onListUpdated = (data) => {
		setList(data)
		closeModals()
	}

	return (
		<CContainer fluid>
			<CPageHeaderView
				loading={loading}
				onAddButtonClick={() => itemEditHandler(null)}
				alertMessage={alertMessage}
				onCloseAlert={() => setAlertMessage("")}
			/>

			<CContainer>
				<CRow>
					{list.map(item => (
						<FoodCategoryItemView
							item={item}
							onItemEditHandler={() => itemEditHandler(item)}
							onItemDeleteHandler={() => itemDeleteHandler(item)}
						/>
					))}
				</CRow>
			</CContainer>

			{/*<CRow>*/}
			{/*	<CTable align="middle" color="light">*/}
			{/*		<CTableHead>*/}
			{/*			<CTableRow align="middle">*/}
			{/*				<CTableHeaderCell scope="col">#</CTableHeaderCell>*/}
			{/*				<CTableHeaderCell scope="col">تصویر</CTableHeaderCell>*/}
			{/*				<CTableHeaderCell scope="col">نام فارسی</CTableHeaderCell>*/}
			{/*				<CTableHeaderCell scope="col">نام انگلیسی</CTableHeaderCell>*/}
			{/*				<CTableHeaderCell scope="col">تعداد آیتم</CTableHeaderCell>*/}
			{/*				<CTableHeaderCell>*/}
			{/*					<CButton color="primary" variant="outline" className="w-100" onClick={() => itemEditHandler(null)}>*/}
			{/*						افزودن*/}
			{/*						<CIcon icon={cilPlus} className="mx-2"/>*/}
			{/*					</CButton>*/}
			{/*				</CTableHeaderCell>*/}
			{/*			</CTableRow>*/}
			{/*		</CTableHead>*/}
			{/*		<CTableBody>*/}
			{/*			{list.map(item => (*/}
			{/*				<CTableRow>*/}
			{/*					<CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>*/}
			{/*					<CTableDataCell><CImage src={item.image} width={150} height={120} thumbnail/></CTableDataCell>*/}
			{/*					<CTableDataCell>{item.nameFa || ""}</CTableDataCell>*/}
			{/*					<CTableDataCell>{item.nameEn || ""}</CTableDataCell>*/}
			{/*					<CTableDataCell>{item.foods_count || 0}</CTableDataCell>*/}
			{/*					<CTableDataCell>*/}
			{/*						<CRow className="justify-content-around" xs={{cols:'auto'}}>*/}
			{/*							<CCol>*/}
			{/*								<CTooltip content="حذف"><CIcon icon={cilTrash}  onClick={() => itemDeleteHandler(item)} /></CTooltip>*/}
			{/*							</CCol>*/}
			{/*							<CCol>*/}
			{/*								<CTooltip content="ویرایش"><CIcon icon={cilPencil}  onClick={() => itemEditHandler(item)} /></CTooltip>*/}
			{/*							</CCol>*/}
			{/*						</CRow>*/}
			{/*					</CTableDataCell>*/}
			{/*				</CTableRow>*/}
			{/*			))}*/}
			{/*		</CTableBody>*/}
			{/*	</CTable>*/}
			{/*</CRow>*/}

			<PostFoodCategoryModal
				item={itemToPost}
				onClose={closeModals}
				onItemUpdated={onListUpdated}

				visible={! (itemToPost ===  undefined) }
			/>

			<DeleteItemModal
				item={itemToDelete}
				visible={ itemToDelete !== undefined }
				onClose={closeModals}
				onDeleteResponse={onListUpdated}
				endpoint={"foodcategory/" + (itemToDelete ? itemToDelete.id : "")}
			/>

		</CContainer>
	)
}

export default FoodCategories
