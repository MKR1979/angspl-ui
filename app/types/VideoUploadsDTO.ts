import BaseDTO from './BaseDTO';
export default interface VideoUploadsDTO extends BaseDTO {
  course_id: number;
  course_name: string;
  title: string;
  video_source: string;
  description: string;
  tags: string;
  status: string;
}

export const VIDEO_UPLOADS_LIST_ALL: VideoUploadsDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  title: '',
  video_source: '',
  description: '',
  tags: '',
  status: '',  
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  created_at: new Date(1899, 11, 31),
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date(1899, 11, 31)
};
