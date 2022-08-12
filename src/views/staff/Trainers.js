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
		Axios.get('trainer').then(res => {
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
						<TrainerItemView
							item={item}
							onItemEditHandler={() => itemEditHandler(item)}
							onItemDeleteHandler={() => itemDeleteHandler(item)}
						/>
					))}
				</CRow>
			</CContainer>

			<PostTrainerModal
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
				endpoint={"trainer/" + (itemToDelete ? itemToDelete.id : "")}
			/>

		</CContainer>
	)
}

export default Counselors
