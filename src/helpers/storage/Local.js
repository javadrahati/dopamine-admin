import StorageHelper from "./StorageHelper";
export default {
	dietProgramDraft: {
		data: {
			set: (obj) => StorageHelper.set("d_draft", obj),
			get: () => StorageHelper.get("d_draft"),
		},
		user: {
			set: (obj) => StorageHelper.set("d_draft_user", obj),
			get: () => StorageHelper.get("d_draft_user"),
		},
		notes: {
			set: (obj) => StorageHelper.set("d_draft_notes", obj),
			get: () => StorageHelper.get("d_draft_notes"),
		},
		videos: {
			set: (obj) => StorageHelper.set("d_draft_videos", obj),
			get: () => StorageHelper.get("d_draft_videos"),
		}
	},

}
