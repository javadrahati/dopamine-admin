import React, {useEffect, useState} from 'react'
import {
	CAlert, CButton, CCol, CContainer, CRow,
	CSpinner
} from "@coreui/react";
import Axios from "../../helpers/axios/Axios";
import {cilPlus} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import DeleteItemModal from "../modal/DeleteItemModal";
import CPaginationView from "../../helpers/Components/CPaginationView";
import BlogItemView from "./BlogItemView";
import PostBlogModal from "./PostBlogModal";
import CPageHeaderView from "../custom/CPageHeaderView";

const Blogs = () => {
	const [alertMessage, setAlertMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const [list, setList] = useState([])
	const [itemToPost, setItemToPost] = useState(undefined)
	const [itemToDelete, setItemToDelete] = useState(undefined)
	const [currentPage, setCurrentPage] = useState(1)
	const [pages, setPages] = useState(4)
	const [foodUnitToDelete, setFoodUnitToDelete] = useState(undefined)

	useEffect(() => {
		fetch(currentPage)
		return () => {}
	}, [currentPage])

	const fetch = (page) => {
		if(loading) return

		setLoading(true)
		Axios.get(`blog?page=${page}`).then(res => {
			setCurrentPage(res.data.current_page ?? 1)
			setPages(res.data.last_page ?? 4)
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
		setFoodUnitToDelete(undefined)
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
			fetch(pages)
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
						<BlogItemView
							item={item}
							onItemEditHandler={() => itemEditHandler(item)}
							onItemDeleteHandler={() => itemDeleteHandler(item)}
						/>
					))}
				</CRow>
			</CContainer>

			<PostBlogModal
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
				endpoint={"blog/" + (itemToDelete ? itemToDelete.id : "")}
			/>

		</CContainer>
	)
}

export default Blogs
