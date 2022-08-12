import React, {useEffect, useState} from 'react'
import {
	CAlert, CAvatar, CButton, CCardText, CCol, CContainer, CPopover, CProgress, CRow,
	CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip
} from "@coreui/react";
import Axios from "../../helpers/axios/Axios";
import {
	cibMixcloud,
	cibOpera,
	cifIr,
	cifUs,
	cilActionRedo,
	cilApps, cilInfo,
	cilPencil,
	cilPeople,
	cilPlus,
	cilTrash, cilWarning
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import DeleteItemModal from "../modal/DeleteItemModal";
import CPaginationView from "../../helpers/Components/CPaginationView";
import TrainerItemView from "./TrainerItemView";
import PostTrainerModal from "./PostTrainerModal";
import CPageHeaderView from "../custom/CPageHeaderView";
import {clone, formatNumber} from "chart.js/helpers";
import PostCounselorModal from "./PostCounselorModal";
import BlogItemView from "../blog/BlogItemView";
import CounselorItemView from "./CounselorItemView";

const Counselors = () => {
	const [alertMessage, setAlertMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const [list, setList] = useState([])
	const [itemToPost, setItemToPost] = useState(undefined)
	const [itemToDelete, setItemToDelete] = useState(undefined)

	useEffect(() => {
		fetch()
		return () => {}
	}, [])

	const fetch = () => {
		setLoading(true)
		Axios.get('counselor').then(res => {
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

	const onItemUpdated = (item) => {
		setList(list.map(e => e.id !== item.id ? e : item))
		closeModals()
	}

	const onItemPosted = (item) => {
		console.log(item)
		let index = list.findIndex(e => e.id === item.id)
		if(index < 0) {
			let newList = clone(list)
			newList.push(item)
			setList(newList)
		} else {
			setList(list.map(e => e.id === item.id ? item : e))
		}
		closeModals()
	}

	const onItemDeleted = ({id}) => {
		setList(list.filter(e => e.id !== id))
		closeModals()
	}

	return (
		<CContainer className="p-1">

			<CPageHeaderView
				loading={loading}
				onAddButtonClick={() => itemEditHandler(null)}
				alertMessage={alertMessage}
				onCloseAlert={() => setAlertMessage("")}
			/>


			<CContainer>
				<CRow>
					{list.map(item => (
						<CounselorItemView
							item={item}
							onItemEditHandler={() => itemEditHandler(item)}
							onItemDeleteHandler={() => itemDeleteHandler(item)}
						/>
					))}
				</CRow>
			</CContainer>

			{/*<CTable align="middle" className="my-1 border" color={"light"} striped responsive>*/}
			{/*	<CTableHead color="light">*/}
			{/*		<CTableRow>*/}
			{/*			<CTableHeaderCell className="text-center">*/}
			{/*				<CIcon icon={cilPeople} />*/}
			{/*			</CTableHeaderCell>*/}
			{/*			<CTableHeaderCell>نام</CTableHeaderCell>*/}
			{/*			<CTableHeaderCell>عنوان حرفه‌ای</CTableHeaderCell>*/}
			{/*			<CTableHeaderCell>هزینه مشاوره</CTableHeaderCell>*/}
			{/*			<CTableHeaderCell>*/}
			{/*				<CIcon icon={cilApps}/>*/}
			{/*			</CTableHeaderCell>*/}
			{/*		</CTableRow>*/}
			{/*	</CTableHead>*/}
			{/*	<CTableBody>*/}
			{/*		{list.map((item, index) => (*/}
			{/*			<CTableRow v-for="item in tableItems" key={index}>*/}
			{/*				<CTableDataCell className="text-center">*/}
			{/*					<CPopover*/}
			{/*						title={(<div className="small">{item.introFa ?? "---"}</div>)}*/}
			{/*						content={(<div className="small text-end">{item.introEn ?? "---"}</div>)}*/}
			{/*						placement={"left"}*/}
			{/*						trigger={"hover"}*/}
			{/*					>*/}
			{/*						<CAvatar size="lg" color={"secondary"} src={item.avatar} />*/}
			{/*					</CPopover>*/}
			{/*				</CTableDataCell>*/}
			{/*				<CTableDataCell>*/}
			{/*					<div>{item.nameFa ?? ""}</div>*/}
			{/*					<div className="small text-medium-emphasis">*/}
			{/*						<span>{item.nameEn ?? ""}</span>*/}
			{/*					</div>*/}
			{/*				</CTableDataCell>*/}
			{/*				<CTableDataCell>*/}
			{/*					<div>{item.bioFa ?? ""}</div>*/}
			{/*					<div className="small text-medium-emphasis">*/}
			{/*						<span>{item.bioEn ?? ""}</span>*/}
			{/*					</div>*/}
			{/*				</CTableDataCell>*/}
			{/*				<CTableDataCell>*/}
			{/*					<div>{item.price.toLocaleString()}</div>*/}
			{/*					/!*<div className="small text-medium-emphasis">*!/*/}
			{/*					/!*	<span>{item.priceStrFa ?? ""}</span>*!/*/}
			{/*					/!*</div>*!/*/}
			{/*				</CTableDataCell>*/}
			{/*				<CTableDataCell>*/}
			{/*					<CRow className="justify-content-start mt-1" xs={{cols:'auto'}}>*/}
			{/*						<CCol>*/}
			{/*							<CTooltip content="حذف"><CIcon icon={cilTrash}  onClick={() => itemDeleteHandler(item)} /></CTooltip>*/}
			{/*						</CCol>*/}
			{/*						<CCol>*/}
			{/*							<CTooltip content="ویرایش"><CIcon icon={cilPencil}  onClick={() => itemEditHandler(item)} /></CTooltip>*/}
			{/*						</CCol>*/}
			{/*					</CRow>*/}
			{/*				</CTableDataCell>*/}
			{/*			</CTableRow>*/}
			{/*		))}*/}
			{/*	</CTableBody>*/}
			{/*</CTable>*/}

			<PostCounselorModal
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
				endpoint={"counselor/" + (itemToDelete ? itemToDelete.id : "")}
			/>

		</CContainer>
	)
}

export default Counselors
