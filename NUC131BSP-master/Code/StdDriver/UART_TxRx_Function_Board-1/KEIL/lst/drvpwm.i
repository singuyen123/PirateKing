#line 1 "..\\..\\..\\..\\Library\\Src\\Driver\\DrvPWM.c"
 
 
 
 
 

 
 
 
#line 1 "..\\..\\..\\..\\Library\\Include\\Driver\\DrvPWM.h"
 
 
 
 
 



 
 
 








 
 
 




 
 
 

                               
 
 
 





 
 
 
#line 51 "..\\..\\..\\..\\Library\\Include\\Driver\\DrvPWM.h"

 
 
 
#line 63 "..\\..\\..\\..\\Library\\Include\\Driver\\DrvPWM.h"

 
 
 




 
 
 



 
 
 






 
 
 





 
 
 



 
 
 
typedef struct
{
    uint8_t   u8Mode;
    uint8_t   u8HighPulseRatio;
    uint8_t   u8ClockSelector;
    uint8_t   u8PreScale;
    uint32_t  u32Frequency; 
    uint32_t  u32Duty;
    int32_t   i32Inverter;
}S_DRVPWM_TIME_DATA_T;

 
 
 
typedef void (*PFN_DRVPWM_CALLBACK)(void);

 
 
 
typedef struct
{
    PFN_DRVPWM_CALLBACK pfnPWM0CallBack;    
    PFN_DRVPWM_CALLBACK pfnCAP0CallBack;
   
    PFN_DRVPWM_CALLBACK pfnPWM1CallBack;    
    PFN_DRVPWM_CALLBACK pfnCAP1CallBack;
    
    PFN_DRVPWM_CALLBACK pfnPWM2CallBack;    
    PFN_DRVPWM_CALLBACK pfnCAP2CallBack;
    
    PFN_DRVPWM_CALLBACK pfnPWM3CallBack;    
    PFN_DRVPWM_CALLBACK pfnCAP3CallBack;        
   
}S_DRVPWM_CALLBACK_T;

 
 
 
void     DrvPWM_ClearCaptureIntStatus(uint8_t u8Capture, uint8_t u8IntType);
void     DrvPWM_ClearInt(uint8_t u8Timer);
void     DrvPWM_Close(void);

void     DrvPWM_DisableInt(uint8_t u8Timer);

void     DrvPWM_Enable(uint8_t u8Timer, int32_t i32Enable);
void     DrvPWM_EnableDeadZone(uint8_t u8Timer, uint8_t u8Length, int32_t i32EnableDeadZone);
void     DrvPWM_EnableInt(uint8_t u8Timer, uint8_t u8Int, PFN_DRVPWM_CALLBACK pfncallback);

int32_t  DrvPWM_GetCaptureIntStatus(uint8_t u8Capture, uint8_t u8IntType);

uint16_t DrvPWM_GetFallingCounter(uint8_t u8Capture);
int32_t  DrvPWM_GetIntFlag(uint8_t u8Timer);
uint16_t DrvPWM_GetRisingCounter(uint8_t u8Capture);
uint32_t DrvPWM_GetTimerCounter(uint8_t u8Timer);
uint32_t DrvPWM_GetVersion (void);

int32_t  DrvPWM_IsTimerEnabled(uint8_t u8Timer);

void     DrvPWM_Open(void);

int32_t  DrvPWM_SelectClearLatchFlagOption(int32_t i32option);
void     DrvPWM_SelectClockSource(uint8_t u8Timer, uint8_t u8ClockSourceSelector);
uint32_t DrvPWM_SetTimerClk(uint8_t u8Timer, S_DRVPWM_TIME_DATA_T *sPt);
void     DrvPWM_SetTimerCounter(uint8_t u8Timer, uint16_t u16Counter);
void     DrvPWM_SetTimerIO(uint8_t u8Timer, int32_t i32Enable);









#line 11 "..\\..\\..\\..\\Library\\Src\\Driver\\DrvPWM.c"
#line 1 "..\\..\\..\\..\\Library\\Include\\Driver\\DrvSYS.h"
 
 
 
 
 



