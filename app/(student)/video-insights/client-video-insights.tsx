'use client';
import './videoInsights.css';
import useVideoInsights from './useVideoInsights';
import VideoUploadsDTO from '@/app/types/VideoUploadsDTO';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyIconSearch from '@/app/custom-components/MyIconSearch';
import { useState } from 'react';

interface ClientCodeProjectProps {
  courseId?: number;
  courseName?: string;
}

const ClientVideoInsights: React.FC<ClientCodeProjectProps> = (props) => {
  const {
    state,
    setOpen1,
    setClose1,
    courseId,
    onCourseChange,
    getYouTubeVideoId
  } = useVideoInsights(props);

  const [searchQuery, setSearchQuery] = useState('');

  // Get currently selected course ID from state or prop
  const selectedCourseId = courseId ?? state.dtoVideoUploads.course_id;

  // Filter videos based on search query and selected course
  const filteredVideos = (state.arrVideoUploadsListAll ?? []).filter(
    (video: VideoUploadsDTO) => {
      const matchesSearch =
        (video.course_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.video_source ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.title ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.tags ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse = selectedCourseId ? video.course_id === selectedCourseId : true;

      return matchesSearch && matchesCourse;
    }
  );

  return (
    <>
      <MyGrid container spacing={1} >
        <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}  >
          <MyAutocomplete sx={{ maxWidth: 500, minWidth: 300, marginBottom: '10px', }}
            className="custom-autocomplete"
            open={state.open1}
            onOpen={courseId ? undefined : setOpen1}
            onClose={courseId ? undefined : setClose1}
            value={
              state.arrCourseLookup.find(
                (opt) => opt.id === selectedCourseId
              ) ?? { id: 0, text: '' }
            }
            getOptionLabel={(option: any) => option.text}
            firstitem={{ id: 0, text: '' }}
            options={state.arrCourseLookup}
            onChange={onCourseChange}
            filterOptions={(options, state) => {
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter(
                (option: any) => option.text && option.text.toLowerCase().includes(searchTerm)
              );
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="Select Course"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                    style: { fontSize: '20px' }
                  }
                }}
                error={!!state.errorMessages.course_name}
              />
            )}
          />
          <MyTypography className="error">{state.errorMessages.course_name}</MyTypography>
        </MyGrid>

        <div className="search-wrapper">
          <span className="search-icon">
            <MyIconSearch />
          </span>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input w-full sm:w-60"
          />
        </div>
      </MyGrid>

      <div className="video-container">
        <div className="video-categories-container">
          {state.isLoading ? (
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : filteredVideos.length === 0 ? (
            <p>No Videos found</p>
          ) : (
            filteredVideos.map((video: VideoUploadsDTO, index) => (
              <div key={video.id ?? index}>
                <div className="video-boxes">
                  <iframe
                    className="video-element"
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.video_source)}`}
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

                  <button
                    className="watch-video-button"
                    onClick={() => window.open(video?.video_source, '_blank')}
                  >
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

