import React, {useEffect, useState} from 'react'
//import {useCurrentEffect} from "../../helpers/use-current-effect";
import {
	CContainer, CRow
} from "@coreui/react";
import Axios from "../../helpers/axios/Axios";
import DeleteItemModal from "../modal/DeleteItemModal";
import CPageHeaderView from "../custom/CPageHeaderView";
import PostVoucherPlanModal from "./PostVoucherPlanModal";
import VoucherPlanItemView from "./VoucherPlanItemView";

const VoucherPlans = () => {
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
		if(loading) return

		setLoading(true)
		Axios.get('voucherPlan').then(res => {
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

	const onItemUpdated = (food) => {
		setList(list.map(e => e.id !== food.id ? e : food))
		closeModals()
	}

	const onItemPosted = (food) => {
		let index = list.findIndex(e => e.id === food.id)
		if(index < 0) {
			fetch()
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
				alertMessage={alertMessage}
				onCloseAlert={() => setAlertMessage("")}
			/>

			<CContainer>
				<CRow>
					{list.map(item => (
						<VoucherPlanItemView
							key={item.id}
							item={item}
							onItemEditHandler={() => itemEditHandler(item)}
							onItemDeleteHandler={() => itemDeleteHandler(item)}
						/>
					))}
				</CRow>
			</CContainer>

			<PostVoucherPlanModal
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
				endpoint={"voucherPlan/" + (itemToDelete ? itemToDelete.id : "")}
			/>

		</CContainer>
	)
}

export default VoucherPlans
