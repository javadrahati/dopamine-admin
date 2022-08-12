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



const Modal = ({
				   onClose=() => {},
				   onItemSelected = (item) => {console.log(item)},
				   ...restProps
			   }) => {
	const [loading, setLoading] = useState(false)
	const [searchKeyword, setSearchKeyword] = useState("")
	const [dataSource, setDataSource] = useState([])
	const [list, setList] = useState([])
	const [selectedItem, setSelectedItem] = useState(null)

	useEffect(() => {
		Axios.get('workout')
			.then(res => {
				setLoading(false)
				setDataSource(res.data)
			})
			.catch(err => {
				setLoading(false)
			});
	}, [])


	useEffect(() => {
		handleSearch()
	}, [searchKeyword, dataSource])

	const handleSearch = () => {
		if(!searchKeyword || searchKeyword.length === 0) {
			setList(dataSource)
		} else {
			setList(dataSource.filter(x => x.nameFa.includes(searchKeyword.toLowerCase()) || x.nameEn.includes(searchKeyword.toLowerCase())))
		}
	}

	const selectItem = item => {
		setSelectedItem(item)
		if(onItemSelected) {
			onItemSelected(item)
		}
	}

	return (
		<CModal alignment={"top"}  {...restProps} onClose={onClose} size="lg">
			<CModalHeader>انتخاب فعالیت</CModalHeader>
			<CModalBody>
				<CRow>
					<CFormFloating>
						<CFormInput id="input_name"
									value={searchKeyword}
									onChange={e => setSearchKeyword(e.target.value)}
						/>
						<CFormLabel htmlFor="input_name">جستجو براساس نام فعالیت</CFormLabel>
					</CFormFloating>
				</CRow>
				<CListGroup className="mt-2">
					{loading && <CListGroupItem key={0}><CSpinner size={"sm"}/></CListGroupItem>}
					{list.map(u => (
						<CListGroupItem key={u.id}
										color={"secondary"}
										active={selectedItem !== null && selectedItem.id === u.id}
										onClick={() => selectItem(u)} >

							<CRow xs={{cols:'auto'}} className="align-items-center">
								<CCol>
									<CImage src={u.image} align="center" width={80} height={45} rounded className="bg-secondary"/>
								</CCol>
								<CCol>
									<CCardText className="small m-0">{u.nameFa}</CCardText>
									<CCardText className="small m-0 extra-small text-secondary">{u.calorieTextFa ?? ""}</CCardText>
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
