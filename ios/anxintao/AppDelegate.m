/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif


#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <UMAnalytics/MobClick.h>
#import <UMCommon/UMConfigure.h>
#import "FileHash.h"

#define sandBoxBundleName (@"index.ios.bundle")

@implementation AppDelegate

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [JPUSHService registerDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object: notification.userInfo];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler
{
  NSDictionary * userInfo = notification.request.content.userInfo;
  if ([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }

  completionHandler(UNNotificationPresentationOptionAlert);
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
{
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if ([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotification object:userInfo];
  }

  completionHandler();
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                            sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [JPUSHService setupWithOption:launchOptions appKey:@"4123cf7cac32cb111277cdd2"
                        channel:nil apsForProduction:nil];

  [UMConfigure setLogEnabled:YES];
  [UMConfigure initWithAppkey:@"599d6d81c62dca07c5001db6" channel:@"App Store"];
  //统计
  [MobClick setScenarioType:E_UM_NORMAL];
  

  #if DEBUG
  [self startApp:launchOptions];
  #else
  [self downBundle];
  #endif
  
  return YES;
}

//启动APP
-(void) startApp:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  NSDictionary *props =[NSDictionary dictionaryWithObject:@"test_value" forKey:@"key1"];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"anxintao"
                                               initialProperties:props
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
}

//返回bundle的位置
-(NSURL*) bundlePathUrl
{
  NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
  return [documentsDirectoryURL URLByAppendingPathComponent:sandBoxBundleName];
}
//返回bundle的MD5
-(NSString*) getToken
{
  return  [FileHash md5HashOfFileAtPath:[self bundlePathUrl].path];
}

//下载方法
- (void) downBundle
{
  NSString *token =[self getToken];
  // 创建下载路径
  NSURL *url = [NSURL URLWithString:@"http://www.guofangchao.com/down"];
  // 创建NSURLRequest请求
  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  //添加header
  NSMutableURLRequest *mutableRequest = [request mutableCopy];    //拷贝request
  [mutableRequest addValue:token forHTTPHeaderField:@"token"];
  request = [mutableRequest copy];        //拷贝回去
  // 创建NSURLSession对象
  NSURLSession *session = [NSURLSession sharedSession];
  
  // 创建下载任务,其中location为下载的临时文件路径
  NSURLSessionDownloadTask *downloadTask = [session downloadTaskWithRequest:request completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
    
    // 新文件路径
    NSString *newFilePath =[self bundlePathUrl].path;
    
    // 移动文件到新路径
    [[NSFileManager defaultManager] moveItemAtPath:location.path toPath:newFilePath error:nil];
  }];
  
  // 开始下载任务
  [downloadTask resume];
  
}

@end
