'use client';
// import { useState } from 'react';
import './videoInsights.css';
import useVideoInsights from './useVideoInsights';
import VideoUploadsDTO from '@/app/types/VideoUploadsDTO';
// import MyIconSearch from '@/app/custom-components/MyIconSearch';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
interface ClientCodeProjectProps {
  courseId?: number;
  courseName?: string;
}

const ClientVideoInsights: React.FC<ClientCodeProjectProps> = (props) => {
  const { state, setOpen1, setClose1, courseId, onCourseChange, onCourseBlur, getYouTubeVideoId } = useVideoInsights(props);

  // const [searchQuery, setSearchQuery] = useState('');
  const filteredVideos = state.arrVideoUploadsListFilter || [];
  // const filteredVideos = (state.arrVideoUploadsListFilter || []).filter((video) =>
  //   video.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <>
      <div className="quiz-container">
        <div className="course-tabs-wrapper">
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              className="custom-autocomplete"
              open={state.open1}
              onOpen={courseId ? undefined : setOpen1}
              onClose={courseId ? undefined : setClose1}
              value={state.arrCourseLookup.find((opt) => opt.id === (courseId ?? state.dtoVideoUploads.course_id)) ?? { id: 0, text: '' }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCourseLookup}
              onChange={onCourseChange}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              onInputChange={(event, newInputValue) => {
                console.log('User input:', newInputValue);
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Course"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onCourseBlur}
                  error={state.errorMessages.course_name ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
          </MyGrid>
        </div>
      </div>

      <div className="video-container">
        {/* <div className="search-wrapper">
          <span className="search-icon">
            <MyIconSearch />
          </span>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div> */}

        <div className="video-categories-container">
          {state.isLoading ? (
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : filteredVideos.length === 0 ? (
            <p>No Videos found</p>
          ) : (
            filteredVideos.map((video: VideoUploadsDTO) => (
              <div key={video.id}>
                <div className="video-boxes">
                  <iframe
                    className="video-element"
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(video?.video_source)}`}
                    title={video?.title || 'YouTube Video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h3 className="video-category-header">
                    {video?.title} {video?.tags}
                  </h3>
                  <ul className="video-items-list">
                    {(video as any)?.items?.map((item: string) => (
                      <li key={item} className="video-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="watch-video-button" onClick={() => window.open(video?.video_source, '_blank')}>
                    Watch video
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ClientVideoInsights;
