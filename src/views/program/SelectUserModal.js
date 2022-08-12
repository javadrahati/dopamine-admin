import React, {useEffect, useState} from "react";
import {
	CAvatar,
	CBadge,
	CButton,
	CButtonGroup,
	CCard,
	CCardBody,
	CCardFooter,
	CCardHeader,
	CCardImage,
	CCardText,
	CCardTitle,
	CCloseButton,
	CCol,
	CContainer,
	CForm, CFormFloating,
	CFormInput, CFormLabel, CFormText, CImage, CListGroup, CListGroupItem,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CRow, CSpinner,
	CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPen, cilPencil, cilTrash, cilX} from "@coreui/icons";
import CLoadingButton from "../../helpers/Components/CLoadingButton";
import ImageUpload from "../../helpers/Components/ImageUpload";
import Axios from "../../helpers/axios/Axios";



const Modal = ({ onClose=null, onItemSelected = null, ...restProps }) => {
	const [loading, setLoading] = useState(false)
	const [searchKeyword, setSearchKeyword] = useState("")
	const [list, setList] = useState([])
	const [selectedItem, setSelectedItem] = useState(null)

	useEffect(() => {
		if(searchKeyword.length >= 2) {
			handleSearch()
		}
	}, [searchKeyword])

	const handleSearch = () => {
		setLoading(true)
		Axios.get(`users/search?q=${searchKeyword}`)
			.then(res => {
				setLoading(false)
				setList(res.data)
			})
			.catch(err => {
				setLoading(false)
			});
	}


	const selectItem = item => {
		setSelectedItem(item)
		if(onItemSelected) {
			onItemSelected(item)
		}
	}

	return (
		<CModal alignment={"top"}  {...restProps} onClose={onClose} size="lg">
			<CModalHeader>انتخاب کاربر</CModalHeader>
			<CModalBody>
				<CRow>
					<CFormFloating>
						<CFormInput id="input_name"
									value={searchKeyword}
									onChange={e => setSearchKeyword(e.target.value)}
						/>
						<CFormLabel htmlFor="input_name">جستجو براساس نام - حداقل 2 کاراکتر وارد کنید</CFormLabel>
					</CFormFloating>
				</CRow>
				<CListGroup className="mt-2" >
					{loading && <CListGroupItem key={0}><CSpinner size={"sm"}/></CListGroupItem>}
					{list.map(u => (
						<CListGroupItem key={u.id}
										color={"secondary"}
										active={selectedItem !== null && selectedItem.id === u.id}
										onClick={() => selectItem(u)} >

							<CRow xs={{cols:'auto'}} className="align-items-center">
								<CCol>
									<CAvatar src={u.avatar} color="secondary">{u.name.substring(0,1) ?? ""}</CAvatar>
								</CCol>
								<CCol>
									<CCardText className="small">{u.name}</CCardText>
								</CCol>
							</CRow>

						</CListGroupItem>
					))}
				</CListGroup>

			</CModalBody>

		</CModal>
	)
}

export default Modal
